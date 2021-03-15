using Microsoft.EntityFrameworkCore;
using Project.Entities;
using Project.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ProductService.Services
{
    public class ProductService : IProductService
    {
        private readonly IGenericRepository<Product> _repository;

        public ProductService(IGenericRepository<Product> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Product>> GetAll(Expression<Func<Product, bool>> predicate, string includes = null)
        {
            var products = _repository.Get(predicate);

            if (!string.IsNullOrEmpty(includes))
            {
                foreach (var include in includes.Split(","))
                {
                    products = products.Include(include);
                }
            }

            return await products.ToListAsync();
        }

        public async Task<Product> Get(Guid id, string includes = null)
        {
            var product = _repository.Get(x => x.Id == id);
            if (!string.IsNullOrEmpty(includes))
            {
                foreach (var include in includes.Split(","))
                {
                    product = product.Include(include);
                }
            }

            return await product.FirstOrDefaultAsync();
        }

        public async Task<Product> Add(Product product)
        {
            product.IsActive = true;
            return await _repository.Add(product);
        }

        public async Task<Product> Update(Product product)
        {
            return await _repository.Update(product);
        }

        public async Task Delete(Product product)
        {
            await _repository.Delete(product);
        }
    }
}
