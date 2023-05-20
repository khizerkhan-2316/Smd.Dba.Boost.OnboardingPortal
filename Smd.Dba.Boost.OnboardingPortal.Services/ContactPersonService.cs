using AutoMapper;
using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;
using Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;
using Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

namespace Smd.Dba.Boost.OnboardingPortal.Services;

public class ContactPersonService : IContactPersonService
{

    private readonly IContactPersonRepository _repository;
    private readonly IMapper _mapper;

    public ContactPersonService(IContactPersonRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }
    public async Task CreateContactPersonAsync(ContactPersonDto contactPerson, CancellationToken cancellationToken)
    {
        await _repository.InsertContactPersonAsync(_mapper.Map<ContactPerson>(contactPerson), cancellationToken);
    }

    public async Task<IEnumerable<ContactPersonDto>> GetContactPersonsAsync(CancellationToken cancellationToken)
    {
        return _mapper.Map<IEnumerable<ContactPersonDto>>(await _repository.GetContactPersonsAsync(cancellationToken));
    }

    public async Task<IEnumerable<ContactPersonDto>> GetContactPersonByCompanyIdAsync(Guid companyId, CancellationToken cancellationToken)
    {
        return _mapper.Map<IEnumerable<ContactPersonDto>>(
            await _repository.GetContactPersonsByCompanyIdAsync(companyId, cancellationToken));
    }

    public async Task<ContactPersonDto?> GetContactPersonByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return  _mapper.Map<ContactPersonDto>(await _repository.GetContactPersonByIdAsync(id, cancellationToken));
    }

    public async Task UpdateContactPersonAsync(Guid id, ContactPersonDto contactPerson, CancellationToken cancellationToken)
    {
        await _repository.UpdateContactPersonAsync(id, _mapper.Map<ContactPerson>(contactPerson), cancellationToken);
    }

    public async Task<bool> DeleteContactPersonByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var rowsDeleted = await _repository.DeleteContactPersonByIdAsync(id, cancellationToken);

        return rowsDeleted > 0;
    }
}