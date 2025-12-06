using System.ComponentModel.DataAnnotations;

namespace webApi.Dtos
{
    public class CreateLocationDto
    {
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
        public int ProvinceId { get; set; }

        [Required]
        [MaxLength(20)]
        [RegularExpression(@"^\d{2}-\d{3}$", ErrorMessage = "Postal code must be in format XX-XXX")]
        public string PostalCode { get; set; } = string.Empty;
    }
}
