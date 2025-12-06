using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webApi.Data;
using webApi.Models;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvincesController : ControllerBase
    {
        private readonly SwiftFoundContext _context;

        public ProvincesController(SwiftFoundContext context)
        {
            _context = context;
        }

        // GET: api/Provinces
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Province>>> GetProvinces()
        {
            return await _context.Provinces.ToListAsync();
        }

        // GET: api/Provinces/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Province>> GetProvince(int id)
        {
            var province = await _context.Provinces.FindAsync(id);

            if (province == null)
            {
                return NotFound();
            }

            return province;
        }

        private bool ProvinceExists(int id)
        {
            return _context.Provinces.Any(e => e.Id == id);
        }
    }
}
