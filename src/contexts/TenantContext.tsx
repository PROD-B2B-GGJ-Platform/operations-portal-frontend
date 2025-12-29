import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface Tenant {
  id: string;
  name: string;
}

interface TenantContextType {
  currentTenantId: string;
  tenantName: string;
  availableTenants: Tenant[];
  switchTenant: (tenantId: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

// List of all tenants (in real app, this would come from an API)
const ALL_TENANTS: Tenant[] = [
  { id: 'techcorp', name: 'TechCorp' },
  { id: 'acme-corp', name: 'ACME Corporation' },
  { id: 'globex-industries', name: 'Globex Industries' },
  { id: 'stark-enterprises', name: 'Stark Enterprises' },
  { id: 'wayne-enterprises', name: 'Wayne Enterprises' },
];

export function TenantProvider({ children }: { children: ReactNode }) {
  const [currentTenantId, setCurrentTenantId] = useState(
    () => localStorage.getItem('tenantId') || 'techcorp'
  );
  
  const currentTenant = ALL_TENANTS.find(t => t.id === currentTenantId) || ALL_TENANTS[0];

  const switchTenant = (tenantId: string) => {
    setCurrentTenantId(tenantId);
    localStorage.setItem('tenantId', tenantId);
  };

  useEffect(() => {
    localStorage.setItem('tenantId', currentTenantId);
  }, [currentTenantId]);

  return (
    <TenantContext.Provider value={{ 
      currentTenantId, 
      tenantName: currentTenant.name,
      availableTenants: ALL_TENANTS,
      switchTenant
    }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
}

