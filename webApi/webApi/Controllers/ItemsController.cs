using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webApi.Data;
using webApi.Dtos;
using webApi.Models;
using webApi.Services;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly SwiftFoundContext _context;
        private readonly IImageService _imageService;
        private readonly ILogger<ItemsController> _logger;

        public ItemsController(
            SwiftFoundContext context,
            IImageService imageService,
            ILogger<ItemsController> logger)
        {
            _context = context;
            _imageService = imageService;
            _logger = logger;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            return await _context.Items
                .Include(i => i.Category)
                .Include(i => i.Location)
                    .ThenInclude(l => l.Province)
                .ToListAsync();
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // PUT: api/Items/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromForm] ItemUpdateDto dto, IFormFile? photo)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
                return NotFound();

            if (dto.LocationId.HasValue)
            {
                var locationExists = await _context.Locations.AnyAsync(l => l.Id == dto.LocationId.Value);
                if (!locationExists)
                    return BadRequest(new { error = $"Location with ID {dto.LocationId.Value} does not exist" });
            }

            if (photo != null)
            {
                if (!string.IsNullOrEmpty(item.PhotoPublicId))
                {
                    await _imageService.DeleteImageAsync(item.PhotoPublicId);
                }

                var (url, publicId) = await _imageService.UploadImageAsync(photo);
                item.PhotoUrl = url;
                item.PhotoPublicId = publicId;
            }

            if (!string.IsNullOrWhiteSpace(dto.Name))
                item.Name = dto.Name;

            if (!string.IsNullOrWhiteSpace(dto.Description))
                item.Description = dto.Description;

            if (dto.DateLost.HasValue)
                item.DateLost = dto.DateLost.Value;

            if (dto.TimeLost.HasValue)
                item.TimeLost = dto.TimeLost;

            if (dto.CategoryId.HasValue)
                item.CategoryId = dto.CategoryId.Value;

            if (dto.LocationId.HasValue)
                item.LocationId = dto.LocationId.Value;

            if (dto.Status.HasValue)
                item.Status = dto.Status.Value;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                    return NotFound();
                throw;
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Database error while updating item {ItemId}", id);
                return BadRequest(new { error = "Failed to update item. Please check foreign key constraints." });
            }

            return NoContent();
        }

        // POST: api/Items
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem([FromForm] ItemCreateDto dto, IFormFile? photo)
        {
            try
            {
                string photoUrl = string.Empty;
                string? photoPublicId = null;

                if (photo != null)
                {
                    var (url, publicId) = await _imageService.UploadImageAsync(photo);
                    photoUrl = url;
                    photoPublicId = publicId;
                }

                var item = new Item
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    DateLost = dto.DateLost,
                    CategoryId = dto.CategoryId,
                    LocationId = dto.LocationId,
                    PhotoUrl = photoUrl,
                    PhotoPublicId = photoPublicId,
                    Status = dto.Status,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Items.Add(item);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating item");
                return BadRequest(new { error = ex.Message });
            }
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
                return NotFound();

            if (!string.IsNullOrEmpty(item.PhotoPublicId))
            {
                await _imageService.DeleteImageAsync(item.PhotoPublicId);
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}
