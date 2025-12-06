using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webApi.Models
{
    [Table("Locations")]
    public class Location
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Range(-180.0, 180.0)]
        public float Longitude { get; set; }

        [Required]
        [Range(-90.0, 90.0)]
        public float Latitude { get; set; }

        [Required]
        [MaxLength(300)]
        public string Address { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        [RegularExpression(@"^\d{2}-\d{3}$", ErrorMessage = "Postal code must be in format XX-XXX")]
        public string PostalCode { get; set; } = string.Empty;
    }
}
