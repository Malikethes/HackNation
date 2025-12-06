using Microsoft.EntityFrameworkCore;
using webApi.Models;

namespace webApi.Data
{
    public class SwiftFoundContext : DbContext
    {
        public SwiftFoundContext(DbContextOptions<SwiftFoundContext> options)
            : base(options)
        {
        }

        public DbSet<Item> Items { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Location> Locations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Item>()
                .HasOne(i => i.Category)
                .WithMany()
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Item>()
                .HasOne(i => i.Location)
                .WithMany()
                .HasForeignKey(i => i.LocationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Item>()
                .Property(i => i.Status)
                .HasConversion<int>();

            modelBuilder.Entity<Item>()
                .HasIndex(i => i.Status);

            modelBuilder.Entity<Item>()
                .HasIndex(i => i.CreatedAt);

            modelBuilder.Entity<Item>()
                .HasIndex(i => i.DateLost);
        }
    }
}