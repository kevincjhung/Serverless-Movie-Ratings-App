using Microsoft.EntityFrameworkCore;

namespace MovieLambdaFunction
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options)
            : base(options){ }

        public DbSet<Movie> Movies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // If you need any additional configuration for the Movie entity, you can specify it here
        }
    }
}
