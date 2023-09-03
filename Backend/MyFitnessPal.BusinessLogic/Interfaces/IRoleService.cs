using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public  interface IRoleService
    {
        Task<int> GetRoleId(string type);
    }
}
