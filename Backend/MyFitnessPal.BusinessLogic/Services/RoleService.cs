using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.DataAccess.IRepositories;

namespace MyFitnessPal.BusinessLogic.Services
{
    public class RoleService: IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<int> GetRoleId(string type)
        {
            int id = await _roleRepository.GetAll()
                                        .Where(r => r.Name.Equals(type))
                                        .Select(r => r.Id)
                                        .FirstOrDefaultAsync();
            return id;
        }
    }
}
