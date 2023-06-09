import { Draggable } from "../models/drag-drop.js";
import { Project } from "../models/project.js";
import Component from "./base-component.js";
import { autobind } from "../decorators/autobind.js";

// ProjectItem Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move"; // 항목을 새 위치로 이동 가능한 옵션
  }

  dragEndHandler(_: DragEvent) {
    const listEls = document.querySelectorAll(
      "#active-projects-list,#finished-projects-list"
    )!;
    for (const listEl of listEls) {
      listEl.classList.remove("droppable");
    }
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
