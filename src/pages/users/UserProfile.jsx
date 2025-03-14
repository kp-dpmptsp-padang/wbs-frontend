// src/pages/users/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { FiUser, FiKey, FiAlertTriangle } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Profile from '@/components/user/Profile';
import UpdateProfileForm from '@/components/user/UpdateProfileForm';
import UpdatePasswordForm from '@/components/user/UpdatePasswordForm';
import PageContainer from '@/components/user/layout/PageContainer';
import authService from '@/services/auth.service';

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [activeView, setActiveView] = useState('profile'); // 'profile', 'edit-profile', 'change-password'
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const result = await authService.getProfile();
        if (result.success) {
          setProfileData(result.data);
        } else {
          addToast(result.error || 'Gagal memuat profil', 'error');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        addToast('Terjadi kesalahan saat memuat profil', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [addToast]);

  const handleUpdateProfile = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('Updating profile with data:', data);
      const result = await authService.updateProfile(data);
      console.log('Update profile result:', result);
      
      if (result.success) {
        // Extract user data properly
        const userData = result.data.user || result.data;
        
        // Update local user state with new data
        setUser(prev => ({ ...prev, ...userData }));
        setProfileData(prev => ({ ...prev, ...userData }));
        addToast('Profil berhasil diperbarui', 'success');
        setActiveView('profile');
      } else {
        addToast(result.error || 'Gagal memperbarui profil', 'error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      addToast('Terjadi kesalahan saat memperbarui profil', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePassword = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await authService.updatePassword(data);
      if (result.success) {
        addToast('Password berhasil diperbarui', 'success');
        setActiveView('profile');
      } else {
        addToast(result.error || 'Gagal memperbarui password', 'error');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      addToast('Terjadi kesalahan saat memperbarui password', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  // We'll use the profile data if available, otherwise fall back to auth context user data
  const userData = profileData || user;

  const renderTabs = () => (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex -mb-px">
        <button
          onClick={() => setActiveView('profile')}
          className={`inline-flex items-center py-3 px-4 border-b-2 text-sm font-medium ${
            activeView === 'profile'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <FiUser className={`mr-2 ${activeView === 'profile' ? 'text-primary' : 'text-gray-400'}`} />
          Profil
        </button>
        <button
          onClick={() => setActiveView('change-password')}
          className={`inline-flex items-center py-3 px-4 border-b-2 text-sm font-medium ${
            activeView === 'change-password'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <FiKey className={`mr-2 ${activeView === 'change-password' ? 'text-primary' : 'text-gray-400'}`} />
          Ganti Password
        </button>
      </nav>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'edit-profile':
        return (
          <UpdateProfileForm
            user={userData}
            onSubmit={handleUpdateProfile}
            onCancel={() => setActiveView('profile')}
            isLoading={isSubmitting}
          />
        );
      case 'change-password':
        return (
          <>
            <UpdatePasswordForm
              onSubmit={handleUpdatePassword}
              isLoading={isSubmitting}
            />
            
            {/* Security Notice */}
            <div className="mt-6">
              <Card className="bg-yellow-50 border-yellow-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiAlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Tips Keamanan</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Gunakan password yang kuat dan unik</li>
                        <li>Jangan bagikan password Anda dengan orang lain</li>
                        <li>Jangan gunakan password yang sama dengan aplikasi lain</li>
                        <li>Hindari menggunakan informasi pribadi sebagai password</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        );
      case 'profile':
      default:
        return (
          <Profile
            user={userData}
            onEditProfile={() => setActiveView('edit-profile')}
          />
        );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageContainer title="Profil Pengguna">
        {renderTabs()}
        {renderContent()}
      </PageContainer>
    </div>
  );
};

export default UserProfile;