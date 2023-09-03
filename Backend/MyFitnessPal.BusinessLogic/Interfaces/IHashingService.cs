using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public interface IHashingService
    {
        string CalculateHashValueWithInput(string input);
        bool IsPasswordVerified(string input, string usedSalt, string initialHash);
    }
}
