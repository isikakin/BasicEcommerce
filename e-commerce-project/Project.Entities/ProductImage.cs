using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Entities
{
    public class ProductImage
    {
        [Key]
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public string Url { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}