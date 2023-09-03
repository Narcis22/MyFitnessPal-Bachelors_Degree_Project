using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Configurations
{
    public class SignInKeySetting
    {
        public const string NAME = "SigninKey";
        public string SecretSignInKeyForJwtToken { get; set; }
    }
}
