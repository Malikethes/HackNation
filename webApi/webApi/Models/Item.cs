using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webApi.Models
{
    [Table("Items")]
    public class Item
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "datetime2")]
        public DateTime DateLost { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? TimeLost { get; set; }

        [Required]
        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; }

        public Category Category { get; set; } = null!;

        [Required]
        public byte[] Photo { get; set; } = Array.Empty<byte>();

        [Required]
        public ItemStatus Status { get; set; } = ItemStatus.Draft;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        [ForeignKey(nameof(Location))]
        public int LocationId { get; set; }

        public Location Location { get; set; } = null!;
    }
}
