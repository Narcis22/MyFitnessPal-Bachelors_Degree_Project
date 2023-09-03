using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.DataAccess;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.DataAccess.Repositories
{
    public class UserMessageRepository: IUserMessageRepository
    {
        private readonly MyFitnessPalDbContext _context;

        public UserMessageRepository(MyFitnessPalDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(UserMessage userMessage)
        {
            await _context.UserMessages.AddAsync(userMessage);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Update(UserMessage userMessage)
        {
            _context.UserMessages.Update(userMessage);
            return await _context.SaveChangesAsync() > 0;
        }

        public IQueryable<UserMessage> GetAll()
        {
            return  _context.UserMessages;
        }

    }
}
