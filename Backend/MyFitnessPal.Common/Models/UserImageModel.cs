using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Models
{
    public class UserImageModel
    {
        public string ImageBase64 { get; set; }
        public string ImageContentType { get; set; }
        public string ProfilePhotoId { get; set; }
    }
}
