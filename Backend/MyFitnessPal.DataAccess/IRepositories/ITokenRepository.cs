using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.DataAccess.IRepositories
{
    public interface ITokenRepository
    {
        Task<bool> Create(Token token);
        Task<bool> Update(Token token);
        Task<bool> Delete(Token token);
        IQueryable<Token> GetAll();
    }
}
