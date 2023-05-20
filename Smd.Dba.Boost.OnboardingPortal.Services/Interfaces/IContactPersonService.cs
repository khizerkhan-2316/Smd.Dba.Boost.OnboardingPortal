using Smd.Dba.Boost.OnboardingPortal.Contract;
using Smd.Dba.Boost.OnboardingPortal.Contract.DTOs;

namespace Smd.Dba.Boost.OnboardingPortal.Services.Interfaces;

public interface IContactPersonService
{
    Task CreateContactPersonAsync(ContactPersonDto contactPerson, CancellationToken cancellationToken);

    Task<IEnumerable<ContactPersonDto>> GetContactPersonsAsync(CancellationToken cancellationToken);

    Task<IEnumerable<ContactPersonDto>> GetContactPersonByCompanyIdAsync(Guid companyId,
        CancellationToken cancellationToken);

    Task<ContactPersonDto?> GetContactPersonByIdAsync(Guid id, CancellationToken cancellationToken);

    Task UpdateContactPersonAsync(Guid id, ContactPersonDto contactPerson, CancellationToken cancellationToken);

    Task<bool> DeleteContactPersonByIdAsync(Guid id, CancellationToken cancellationToken);
}