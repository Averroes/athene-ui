import { DiagramShape } from '@app/wireframes/model';

import { AbstractContext, AbstractControl, TextSizeConstraint } from '@app/wireframes/shapes/utils/abstract-control';
import { CommonTheme } from './_theme';

const DEFAULT_APPEARANCE = {};
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_FOREGROUND_COLOR] = 0x08519c;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_BACKGROUND_COLOR] = CommonTheme.CONTROL_BACKGROUND_COLOR;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_TEXT] = 'Link';
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_TEXT_ALIGNMENT] = 'center';
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_FONT_SIZE] = CommonTheme.CONTROL_FONT_SIZE;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_STROKE_COLOR] = CommonTheme.CONTROL_BORDER_COLOR;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_STROKE_THICKNESS] = CommonTheme.CONTROL_BORDER_THICKNESS;

const CONSTRAINT = new TextSizeConstraint(5);

export class Link extends AbstractControl {
    public identifier(): string {
        return 'Link';
    }

    public createDefaultShape(shapeId: string): DiagramShape {
        return DiagramShape.createShape(shapeId, this.identifier(), 40, 30, undefined, DEFAULT_APPEARANCE, CONSTRAINT);
    }

    protected renderInternal(ctx: AbstractContext) {
        const textItem = ctx.renderer.createSinglelineText(ctx.bounds, ctx.shape);

        ctx.renderer.setForegroundColor(textItem, ctx.shape);

        ctx.add(textItem);

        const fontSize = ctx.shape.appearance.get(DiagramShape.APPEARANCE_FONT_SIZE) || 12;

        const b = ctx.renderer.getBounds(textItem);

        const w = Math.round(Math.min(b.width, ctx.bounds.width));
        const x = Math.round((ctx.bounds.width - w) * 0.5);
        const y = Math.round((ctx.bounds.centerY + fontSize * 0.5)) +
                    (ctx.shape.appearance.get(DiagramShape.APPEARANCE_STROKE_THICKNESS) % 2 === 1 ? 0.5 : 0);

        const underlineItem = ctx.renderer.createPath(`M${x},${y} L${x + w},${y}`, ctx.shape);

        ctx.renderer.setStrokeColor(underlineItem, ctx.shape.appearance.get(DiagramShape.APPEARANCE_FOREGROUND_COLOR));

        ctx.add(underlineItem);
    }
}