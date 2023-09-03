using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Entities.Entities
{
    public class UserInfo
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public byte[]? ImageByteArray { get; set; } = null!;
        public string? ImageContentType { get; set; } = null!;
        public string ProfilePhotoId { get; set; }
        public string? Sex { get; set; }
        public int? Height { get; set; }
        public float? Weight { get; set; }
        public int? Age { get; set; }
    }
}
