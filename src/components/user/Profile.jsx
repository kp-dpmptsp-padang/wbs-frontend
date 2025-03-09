// src/components/user/Profile.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiUser, FiMail, FiClock, FiFileText } from 'react-icons/fi';
import Card from '@/components/common/Card';
import Avatar from '@/components/common/Avatar';
import Badge from '@/components/common/Badge';
import { formatDate } from '@/utils/formatters';

const Profile = ({ user, onEditProfile }) => {
  if (!user) {
    return (
      <Card className="animate-pulse">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Get user initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Get role badge color
  const getRoleBadgeProps = (role) => {
    switch (role) {
      case 'super-admin':
        return { variant: 'danger', label: 'Super Admin' };
      case 'admin':
        return { variant: 'warning', label: 'Admin' };
      default:
        return { variant: 'info', label: 'User' };
    }
  };

  const roleBadge = getRoleBadgeProps(user.role);

  return (
    <Card>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar/Profile Picture */}
        <div className="flex-shrink-0">
          <Avatar 
            size="xl"
            src={user.avatar}
            alt={user.name}
            initials={getInitials(user.name)}
            className="border-4 border-white shadow-md"
            fallbackClassName="bg-primary text-white"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <Badge 
              variant={roleBadge.variant} 
              size="sm" 
              className="sm:ml-2"
            >
              {roleBadge.label}
            </Badge>
          </div>

          {/* User details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FiMail className="shrink-0 text-gray-400" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FiClock className="shrink-0 text-gray-400" />
              <span>Bergabung sejak {formatDate(user.createdAt || '2023-01-01')}</span>
            </div>
            {user.reportCount !== undefined && (
              <div className="flex items-center gap-2 text-gray-600">
                <FiFileText className="shrink-0 text-gray-400" />
                <span>Total Laporan: {user.reportCount}</span>
              </div>
            )}
          </div>

          {/* Edit button */}
          <button
            onClick={onEditProfile}
            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md transition-colors"
          >
            <FiUser className="mr-2" />
            Edit Profil
          </button>
        </div>
      </div>
    </Card>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    createdAt: PropTypes.string,
    reportCount: PropTypes.number
  }),
  onEditProfile: PropTypes.func.isRequired
};

export default Profile;