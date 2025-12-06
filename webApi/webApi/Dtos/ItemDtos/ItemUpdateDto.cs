using System.ComponentModel.DataAnnotations;
using webApi.Models;

namespace webApi.Dtos
{
    public class ItemUpdateDto
    {
        [MaxLength(200)]
        public string? Name { get; set; }

        [MaxLength(1000)]
        public string? Description { get; set; }

        public DateTime? DateLost { get; set; }

        public DateTime? TimeLost { get; set; }

        public int? CategoryId { get; set; }

        public int? LocationId { get; set; }

        public ItemStatus? Status { get; set; }
    }
}
