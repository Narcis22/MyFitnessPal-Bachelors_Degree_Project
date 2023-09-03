using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Exceptions
{
    public class UserAlreadyRegisteredException : Exception
    {
        public string EntityName { get; }
        public UserAlreadyRegisteredException(string entityName, string errMessage) : base(errMessage)
        {
            EntityName = entityName;
        }
    }
}
