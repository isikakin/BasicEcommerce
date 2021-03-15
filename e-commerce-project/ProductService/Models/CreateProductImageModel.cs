using System;

namespace ProductService.Models
{
    public class CreateProductImageModel
    {
        public Guid ProductId { get; set; }
        public string Url { get; set; }
    }
}
