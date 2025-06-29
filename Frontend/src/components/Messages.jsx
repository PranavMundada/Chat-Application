import Username from './Username';

function Messages({ messages, userId }) {
  const messagesList = messages.map((msg, index) => (
    <div key={index} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
      <div className="flex-col">
        <Username msg={msg} userId={userId} />
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            msg.sender === userId
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 text-gray-800'
          }`}
        >
          <p className="text-sm">{msg.message}</p>
          <p
            className={`text-xs mt-1 ${msg.sender === userId ? 'text-blue-100' : 'text-gray-500'}`}
          ></p>
        </div>
      </div>
    </div>
  ));
  return <div className="flex-1 overflow-y-auto p-4 space-y-4">{messagesList}</div>;
}

export default Messages;
