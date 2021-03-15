using Microsoft.EntityFrameworkCore;
using Project.Entities;
using Project.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductService.Services
{
    public class ProductImageService : IProductImageService
    {
        private readonly IGenericRepository<ProductImage> _repository;

        public ProductImageService(IGenericRepository<ProductImage> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ProductImage>> GetByProductId(Guid productId)
        {
            return await _repository.Get(x => x.ProductId == productId).ToListAsync();
        }
        public async Task<ProductImage> Get(Guid id)
        {
            return await _repository.Get(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<ProductImage> Add(ProductImage productImage)
        {
            return await _repository.Add(productImage);
        }

        public async Task<ProductImage> Update(ProductImage productImage)
        {
            return await _repository.Update(productImage);
        }
        public async Task Delete(ProductImage productImage)
        {
            await _repository.Delete(productImage);
        }
    }
}
