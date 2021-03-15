using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProductService.Models;
using ProductService.Services;
using Project.Entities;
using System;
using System.Threading.Tasks;

namespace ProductService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ILogger<ProductController> _logger;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService, ILogger<ProductController> logger, IMapper mapper)
        {
            _productService = productService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAll(string includes)
        {
            try
            {
                return Ok(await _productService.GetAll(x => x.IsActive, includes));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetProduct(Guid id, string includes = null)
        {
            try
            {
                Product product = await _productService.Get(id, includes);
                if (product == null)
                {
                    return NotFound();
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CreateProductModel createProduct)
        {
            try
            {
                Product product = _mapper.Map<Product>(createProduct);
                product.Id = Guid.NewGuid();
                return Ok(await _productService.Add(product));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest();
            }
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        [Route("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProductModel updateProduct)
        {
            try
            {
                Product product = await _productService.Get(id);
                if (product == null)
                {
                    return NotFound();
                }
                product = _mapper.Map(updateProduct, product);
                return Ok(await _productService.Update(product));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest();
            }
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                Product product = await _productService.Get(id);

                if (product == null)
                {
                    return NotFound();
                }

                await _productService.Delete(product);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest();
            }
        }
    }
}
