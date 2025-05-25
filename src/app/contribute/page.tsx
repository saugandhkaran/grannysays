const Contribute: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Contribute to Granny's Tips</h1>
      <p className="text-gray-600 mb-4">
        You can contribute to our collection of tips and tricks in two ways:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 dark:bg-slate-700">
          <h2 className="text-xl font-semibold mb-2">Edit Existing Tips</h2>
          <p className="text-gray-700 mb-4 dark:text-gray-300">
            Help us improve the tips by suggesting edits or updates to existing ones.
          </p>
          <button className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded">
            Edit Tips
          </button> 
          </div>
        <div className="bg-white rounded-lg shadow-md p-6 dark:bg-slate-700">
          <h2 className="text-xl font-semibold mb-2">Add New Tips</h2>
          <p className="text-gray-700 mb-4 dark:text-gray-300">
            Share your own tips and tricks that you think would be helpful for others.
          </p>
          <button className="bg-green-500 dark:bg-emerald-700 text-white px-4 py-2 rounded">
            Add New Tip
          </button>
          </div>
          </div>
      <p className="text-gray-600 mt-4">
        We appreciate your contributions! Your tips can help others discover new ways to make their lives easier.
      </p>
      <p className="text-gray-600 mt-4">
        If you have any questions or need assistance, feel free to reach out to us.
      </p>
      <p className="text-gray-600 mt-4">
        Thank you for being a part of our community!
      </p>
    </div>
  );
}
export default Contribute;