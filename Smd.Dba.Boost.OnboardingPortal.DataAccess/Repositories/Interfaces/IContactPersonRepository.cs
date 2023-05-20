using Smd.Dba.Boost.OnboardingPortal.DataAccess.DAOs;

namespace Smd.Dba.Boost.OnboardingPortal.DataAccess.Repositories.Interfaces;

public interface IContactPersonRepository
{
    Task InsertContactPersonAsync(ContactPerson contactPerson, CancellationToken cancellationToken);

    Task<IEnumerable<ContactPerson>> GetContactPersonsAsync(CancellationToken cancellationToken);

    Task<IEnumerable<ContactPerson>> GetContactPersonsByCompanyIdAsync(Guid companyId,
        CancellationToken cancellationToken);

    Task<ContactPerson?> GetContactPersonByIdAsync(Guid id, CancellationToken cancellationToken);

    Task UpdateContactPersonAsync(Guid id, ContactPerson contactPerson, CancellationToken cancellationToken);

    Task<int> DeleteContactPersonByIdAsync(Guid id, CancellationToken cancellationToken);
}