using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Configurations
{
    public class ConnectionStringSetting
    {
        public const string NAME = "ConnectionStrings";
        public IDictionary<DatabaseIdentifier, DbConfig> ConnectionStringConfigs { get; set; }
    }

    public enum DatabaseIdentifier
    {
        MyFitnessPal,
    }

    public class DbConfig
    {
        public string ConnectionString { get; set; }
        public int TimeoutSeconds { get; set; }
    }
}
