import React, { useState }  from 'react'

import { useChatContext } from 'stream-chat-react'
import { userList} from './'
import { CloseCreateChannel } from '../assets'
import UserList from './UserList';

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault();
    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Nom</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name"
      />
      <p>Ajouter des membres </p>
    </div>
  );
};


const EditChannel = ({setIsEditing}) => {
const { channel} = useChatContext();
const [channelName, setChannelName] = useState(channel?.data?.name)
const [selectedUsers, setSelectedUsers] = useState([])

const updateChannel = async (event) => {
  event.preventDefault();

  const nameChanged = channelName !== (channel.data.name || channel.data.id);

  if(nameChanged){
    await channel.update({ name: channelName }, { text: `Le nom du Salon a changer pour ${channelName}`})
  }

  if(selectedUsers.length){
    await channel.addMembers(selectedUsers);
  }

  setChannelName(null);
  setIsEditing(false);
  setSelectedUsers([])
}

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Modifier le Salon</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />   
      <UserList setSelectedUsers={setSelectedUsers}/>
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>Enregistrer</p>
      </div>
       </div>
  )
}

export default EditChannel