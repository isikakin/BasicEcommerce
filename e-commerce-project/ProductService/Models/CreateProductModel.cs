using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductService.Models
{
    public class CreateProductModel
    {
        public string Name { get; set; }
        public string Barcode { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int Piece { get; set; }
        public string InventoryStatus { get; set; }
        public int Rating { get; set; }
    }
}
