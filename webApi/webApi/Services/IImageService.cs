namespace webApi.Services
{
    public interface IImageService
    {
        Task<(string Url, string PublicId)> UploadImageAsync(IFormFile file);
        Task<bool> DeleteImageAsync(string publicId);
    }
}
