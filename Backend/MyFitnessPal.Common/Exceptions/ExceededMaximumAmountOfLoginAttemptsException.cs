﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Exceptions
{
    public class ExceededMaximumAmountOfLoginAttemptsException : Exception
    {
        public ExceededMaximumAmountOfLoginAttemptsException(string errMessage) : base(errMessage)
        {

        }
    }
}
