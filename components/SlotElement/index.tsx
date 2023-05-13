import classNames from "classnames";
import { Slot } from "models/Weapon";
import { useDrop, useDrag } from "react-dnd";
import classes from "./index.module.scss";

interface Props {
  slot: Slot;
}

const SlotElement = ({ slot }: Props) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "all",
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [slot]
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "all",
      item: slot,
      canDrag: () => !!slot.item,
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [slot]
  );

  const slotClassName = classNames(classes.slotElement, {
    [classes.allowedDropzone]: canDrop && !isOver,
    [classes.canDrop]: canDrop && isOver,
  });

  const dropClassName = classNames(classes.dragContainer, {
    [classes.isDragging]: isDragging,
    [classes.isNotDraggable]: !slot.item,
  });

  return (
    <div ref={drop} className={slotClassName}>
      <div ref={drag} className={dropClassName}>
        <div className={classes.itemElement}>
          <SlotItemContent slot={slot} isDraggable={true} />
        </div>
      </div>
    </div>
  );
};

const SlotItemContent = ({
  slot,
  isDraggable = true,
}: {
  slot: Slot;
  isDraggable?: boolean;
}) => {
  if (!slot.item) return null;
  return (
    <div className={classes.itemSlot}>
      <img
        src={slot.item.image}
        className={classes.image}
        draggable={isDraggable}
      />
    </div>
  );
};

export default SlotElement;
