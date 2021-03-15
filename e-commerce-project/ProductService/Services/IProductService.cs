using Project.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ProductService.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAll(Expression<Func<Product, bool>> predicate, string includes = null);
        Task<Product> Get(Guid id, string includes = null);
        Task<Product> Add(Product product);
        Task<Product> Update(Product product);
        Task Delete(Product product);
    }
}
