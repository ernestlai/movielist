class MovieList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <input type="text" className="search-bar" placeholder="Search..." />
            </div>
        )
    }
}