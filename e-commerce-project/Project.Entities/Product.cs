using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Project.Entities
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        [MaxLength(11)]
        public string Barcode { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int Piece { get; set; }
        public string InventoryStatus { get; set; }
        public int Rating { get; set; }
        public ICollection<ProductImage> ProductImages { get; set; }
        public bool IsActive { get; set; }
    }
}
