using Microsoft.EntityFrameworkCore;

namespace MovieLambdaFunction;

public class DatabaseContext : DbContext
{
  public DatabaseContext(DbContextOptions<DatabaseContext> options) 
    : base(options) { }

  public DbSet<Movie> Movies => Set<Movie>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Movie>()
      .Property(m => m.Title)
      .IsRequired();
  }
}
