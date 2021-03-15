using Project.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductService.Services
{
    public interface IProductImageService
    {
        Task<IEnumerable<ProductImage>> GetByProductId(Guid productId);
        Task<ProductImage> Get(Guid id);
        Task<ProductImage> Add(ProductImage productImage);
        Task<ProductImage> Update(ProductImage productImage);
        Task Delete(ProductImage productImage);
    }
}
