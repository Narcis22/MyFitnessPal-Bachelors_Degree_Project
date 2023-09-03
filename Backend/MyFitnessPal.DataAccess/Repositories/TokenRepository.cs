using MyFitnessPal.DataAccess.IRepositories;
using MyFitnessPal.Entities.Entities;

namespace MyFitnessPal.DataAccess.Repositories
{
    public class TokenRepository: ITokenRepository
    {
        private readonly MyFitnessPalDbContext _context;

        public TokenRepository(MyFitnessPalDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(Token token)
        {
            await _context.Tokens.AddAsync(token);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Update(Token token)
        {
            _context.Tokens.Update(token);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(Token token)
        {
            _context.Tokens.Remove(token);
            return await _context.SaveChangesAsync() > 0;
        }

        public IQueryable<Token> GetAll()
        {
            return _context.Tokens;
        }
    }
}
