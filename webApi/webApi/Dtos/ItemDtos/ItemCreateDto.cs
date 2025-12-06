using System.ComponentModel.DataAnnotations;
using webApi.Models;

namespace webApi.Dtos
{
    public class ItemCreateDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime DateLost { get; set; }

        public DateTime? TimeLost { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public int LocationId { get; set; }

        [Required]
        public ItemStatus Status { get; set; }
    }
}
