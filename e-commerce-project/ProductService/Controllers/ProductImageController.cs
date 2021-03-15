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
    public class ProductImageController : ControllerBase
    {
        private readonly IProductImageService _productImageService;
        private readonly ILogger<ProductImageController> _logger;
        private readonly IMapper _mapper;
        public ProductImageController(IProductImageService productImageService, ILogger<ProductImageController> logger, IMapper mapper)
        {
            _productImageService = productImageService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("product/{productId:guid}")]
        public async Task<IActionResult> GetByProductId(Guid productId)
        {
            try
            {
                var productImages = await _productImageService.GetByProductId(productId);
                if (productImages == null)
                {
                    return NotFound();
                }

                return Ok(productImages);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            try
            {
                ProductImage product = await _productImageService.Get(id);
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
        public async Task<IActionResult> Create([FromBody] CreateProductImageModel createProductImage)
        {
            try
            {
                ProductImage productImage = _mapper.Map<ProductImage>(createProductImage);
                productImage.Id = Guid.NewGuid();
                return Ok(await _productImageService.Add(productImage));
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
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProductImageModel updateProduct)
        {
            try
            {
                ProductImage productImage = await _productImageService.Get(id);
                if (productImage == null)
                {
                    return NotFound();
                }
                productImage = _mapper.Map(updateProduct, productImage);
                return Ok(await _productImageService.Update(productImage));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex);
            }
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                ProductImage productImage = await _productImageService.Get(id);

                if (productImage == null)
                {
                    return NotFound();
                }

                await _productImageService.Delete(productImage);
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
