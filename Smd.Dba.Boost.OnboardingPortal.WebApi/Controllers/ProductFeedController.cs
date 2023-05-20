using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;
using Smd.Dba.Boost.OnboardingPortal.Contract.Enums;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.WebApi.Controllers;


[ApiController]
[Authorize]
[Route("/api/v1/productfeeds")]
[Produces("application/json")]

public class ProductFeedController : ControllerBase
{

    private readonly IProductFeedService _service;

    public ProductFeedController(IProductFeedService service)
    {
        _service = service;
    }
    
    [Authorize(Roles = nameof(Role.Admin))]
    [HttpPost]
    public async Task<IActionResult> CreateProductFeed([FromBody] ProductFeedDto productFeed,
        CancellationToken cancellationToken)
    {
        try
        {
            productFeed.Id = Guid.NewGuid();
            await _service.CreateProductFeedAsync(productFeed, cancellationToken);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpGet]
    public async Task<IActionResult> GetProductFeeds([FromQuery] Guid? companyId, CancellationToken cancellationToken)
    {

        IEnumerable<ProductFeedDto> productFeeds;

        if (companyId.HasValue)
        {
            productFeeds = await _service.GetProductFeedsByCompanyIdAsync(companyId.Value, cancellationToken);
        }
        else
        {
            productFeeds = await _service.GetProductFeedsAsync(cancellationToken);
        }

        return productFeeds.Any() ? Ok(productFeeds) : NotFound();
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductFeedById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var productFeed = await _service.GetProductFeedByIdAsync(id, cancellationToken);

        return productFeed != null ? Ok(productFeed) : NotFound();
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProductFeed([FromRoute] Guid id, [FromBody] ProductFeedDto productFeed,
        CancellationToken cancellationToken)
    {
        await _service.UpdateProductFeedAsync(id, productFeed, cancellationToken);
        return Ok();
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProductFeedById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var isDeleted = await _service.DeleteProductFeedByIdAsync(id, cancellationToken);

        return isDeleted ? Ok() : NotFound();
    }
}