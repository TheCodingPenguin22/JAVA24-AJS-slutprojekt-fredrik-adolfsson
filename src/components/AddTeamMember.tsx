export default function AddTeamMember() {
  return (
    <form className="border-r-1 w-1/3 pr-1 h-full flex flex-col">
      <p className="font-bold pl-1">Add Teammember:</p>
      <div className="flex flex-col w-3/5 pl-3">
        <label htmlFor="teamMemberName">Name:</label>
        <input type="text" className="border" name="teamMemberName" />
        <label htmlFor="teamMemberCategory">Role:</label>
        <select name="teamMemberCategory" className="border mt-2">
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="ux">UX</option>
        </select>
      </div>
      <button type="submit" className="border h-fit w-fit items-center justify-center ml-3 mt-1">Add member</button>
    </form>
  )
}
