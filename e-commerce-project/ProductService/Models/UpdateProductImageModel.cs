using System;

namespace ProductService.Models
{
    public class UpdateProductImageModel
    {
        public Guid ProductId { get; set; }
        public string Url { get; set; }
    }
}
