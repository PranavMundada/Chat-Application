import { useEffect, useState } from 'react';
import { ArrowLeft, Users, Check } from 'lucide-react';
import { Button } from './button';
import { Input } from './c_input';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Checkbox } from './checkbox';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [createdGroup, setCreatedGroup] = useState();
  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const tempf = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          withCredentials: true,
        });
        setCurrUser(response.data.user);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    tempf();
  }, []);

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedUsers.length > 0) {
      // Here you would typically create the group chat
      try {
        const tempSelectedUsers = selectedUsers;
        tempSelectedUsers.push(currUser.id);
        const createGroup = async () => {
          const newGroup = await axios.post(`${import.meta.env.VITE_API_URL}/api/chats`, {
            name: groupName.trim(),
            isGroupChat: true,
            users: tempSelectedUsers,
          });
          setCreatedGroup(newGroup.data.data.newChatGroup);
        };
        createGroup();
        navigate('/chat');
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (createdGroup) {
      navigate('/chat');
    }
  }, [createdGroup, navigate]);

useEffect(() => {
  if (!currUser.id) return; // ⛔ skip if currUser not ready

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users?sort=name`, {
        withCredentials: true,
      });

      const allUsers = response.data.data.users.map((el) => ({
        ...el,
        avatar: "👤",
      }));

      const filteredUsers = allUsers.filter((el) => el._id !== currUser._id);

      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }finally {
      setLoadingUsers(false); // ✅ stop loading after success/failure
    }
  };

  fetchUsers();
}, [currUser]); // ✅ only run this when currUser is set


  //   const users = [
  //     { id: 1, name: "John Doe", status: "online", avatar: "👤" },
  //     { id: 2, name: "Jane Smith", status: "online", avatar: "👩" },
  //     { id: 3, name: "Mike Johnson", status: "away", avatar: "👨" },
  //     { id: 4, name: "Sarah Wilson", status: "offline", avatar: "👱‍♀️" },
  //     { id: 5, name: "Tom Brown", status: "online", avatar: "🧑" },
  //   ];

  const handleUserSelect = (userId) => {
    setSelectedUsers(
      (prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId) // remove
          : [...prev, userId] // add
    );
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/chat">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Create Group Chat</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>New Group</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Group Name Input */}
            <div>
              <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-2">
                Group Name
              </label>
              <Input
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name..."
                className="w-full"
              />
            </div>

            {/* User Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Members ({selectedUsers.length} selected)
              </label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {loadingUsers?(<div>Loading users</div>):(users.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleUserSelect(user._id)}
                  >
                    <Checkbox
                      checked={selectedUsers.includes(user._id)}
                      onCheckedChange={() => handleUserSelect(user._id)}
                    />
                    <div className="relative">
                      <span className="text-2xl">{user.avatar}</span>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                          user.status
                        )}`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{user.status}</p>
                    </div>
                    {selectedUsers.includes(user._id) && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                )))}
              </div>
            </div>

            {/* Create Button */}
            <div className="flex justify-end space-x-3 pt-4">
              <Link to="/chat">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button onClick={handleCreateGroup} className="bg-green-600 hover:bg-green-700">
                Create Group
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateGroup;
