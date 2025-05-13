
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';

export const useStatusBadge = () => {
  const { t } = useTranslation();

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">{t('pendingReview')}</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">{t('approved')}</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">{t('rejected')}</Badge>;
      default:
        return null;
    }
  };

  return { renderStatusBadge };
};
