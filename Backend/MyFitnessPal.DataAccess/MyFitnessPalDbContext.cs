using Microsoft.EntityFrameworkCore;
using MyFitnessPal.Entities.Entities;
using System.Reflection;

namespace MyFitnessPal.DataAccess
{
    public class MyFitnessPalDbContext: DbContext
    {
        public MyFitnessPalDbContext(DbContextOptions<MyFitnessPalDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Achievement> Achievements { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<UserInfo> UsersInfo { get; set; }
        public DbSet<Statistics> Statistics { get; set; }
        public DbSet<UserMessage> UserMessages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }
}
