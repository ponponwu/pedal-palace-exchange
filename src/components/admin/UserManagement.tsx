
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
  bicycles_count: number;
  messages_count: number;
}

const UserManagement: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // First get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (profilesError) throw profilesError;
      
      if (profiles) {
        // For each profile, count their bicycles and messages
        const usersWithCounts = await Promise.all(
          profiles.map(async (profile) => {
            // Count bicycles
            const { count: bicyclesCount } = await supabase
              .from('bicycles')
              .select('*', { count: 'exact' })
              .eq('user_id', profile.id);
              
            // Count messages (sent or received)
            const { count: messagesCount } = await supabase
              .from('messages')
              .select('*', { count: 'exact' })
              .or(`sender_id.eq.${profile.id},receiver_id.eq.${profile.id}`);
              
            return {
              ...profile,
              bicycles_count: bicyclesCount || 0,
              messages_count: messagesCount || 0
            };
          })
        );
        
        setUsers(usersWithCounts);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: 'destructive',
        title: t('error'),
        description: t('failedToFetchUsers'),
      });
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('userManagement')}</h1>
        <p className="text-gray-500">{t('viewAndManageUsers')}</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('allUsers')}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('user')}</TableHead>
                  <TableHead>{t('role')}</TableHead>
                  <TableHead>{t('joinDate')}</TableHead>
                  <TableHead>{t('bicycles')}</TableHead>
                  <TableHead>{t('messages')}</TableHead>
                  <TableHead>{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          {user.avatar_url ? (
                            <AvatarImage src={user.avatar_url} alt={user.full_name} />
                          ) : (
                            <AvatarFallback>
                              {user.full_name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span>{user.full_name || t('unnamed')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.role === 'admin' ? (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          {t('admin')}
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          {t('user')}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>{user.bicycles_count}</TableCell>
                    <TableCell>{user.messages_count}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast({
                            title: t('featureNotAvailable'),
                            description: t('userProfileViewingComingSoon'),
                          })}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {t('view')}
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast({
                            title: t('featureNotAvailable'),
                            description: t('userMessageViewingComingSoon'),
                          })}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {t('messages')}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      {t('noUsers')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
