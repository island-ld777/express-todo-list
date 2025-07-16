export function ListItem({item}) {
    return (
        <>
        <div>
            <h3>{item.task} | {item.done ? <>Done</> : <>Not Done</>}</h3>
        </div>
        </>
    );
}