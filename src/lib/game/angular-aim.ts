import { Target, TargetSize } from '@/types/game';

export interface AngularCamera {
  yaw: number;
  pitch: number;
}

export interface ProjectedTarget {
  x: number;
  y: number;
  radius: number;
  visible: boolean;
  deltaYaw: number;
  deltaPitch: number;
}

const HORIZONTAL_FOV_DEGREES = 90;
const MAX_PITCH_DEGREES = 45;

const ANGULAR_TARGET_RADIUS: Record<TargetSize, number> = {
  small: 1.2,
  medium: 1.8,
  large: 2.5,
};

export function getAngularTargetRadius(size: TargetSize): number {
  return ANGULAR_TARGET_RADIUS[size];
}

export function rotateCamera(
  camera: AngularCamera,
  movementX: number,
  movementY: number,
  degreesPerInputUnit: number
): AngularCamera {
  if (Math.abs(movementX) > 200 || Math.abs(movementY) > 200) {
    return camera;
  }

  return {
    yaw: camera.yaw + movementX * degreesPerInputUnit,
    pitch: Math.max(
      -MAX_PITCH_DEGREES,
      Math.min(MAX_PITCH_DEGREES, camera.pitch - movementY * degreesPerInputUnit)
    ),
  };
}

export function projectTarget(
  canvas: HTMLCanvasElement,
  camera: AngularCamera,
  target: Target
): ProjectedTarget {
  const yaw = target.yaw ?? 0;
  const pitch = target.pitch ?? 0;
  const angularRadius = target.angularRadius ?? 1.8;
  const deltaYaw = yaw - camera.yaw;
  const deltaPitch = pitch - camera.pitch;
  const focalLength =
    (canvas.width / 2) / Math.tan((HORIZONTAL_FOV_DEGREES * Math.PI) / 360);
  const x = canvas.width / 2 + Math.tan((deltaYaw * Math.PI) / 180) * focalLength;
  const y = canvas.height / 2 - Math.tan((deltaPitch * Math.PI) / 180) * focalLength;
  const radius = Math.max(
    10,
    Math.min(72, Math.tan((angularRadius * Math.PI) / 180) * focalLength)
  );

  return {
    x,
    y,
    radius,
    visible:
      Math.abs(deltaYaw) < HORIZONTAL_FOV_DEGREES / 2 + angularRadius &&
      y > -radius &&
      y < canvas.height + radius,
    deltaYaw,
    deltaPitch,
  };
}

export function isTargetCentered(target: Target, camera: AngularCamera): boolean {
  const yaw = target.yaw ?? 0;
  const pitch = target.pitch ?? 0;
  const angularRadius = target.angularRadius ?? 1.8;
  const deltaYaw = yaw - camera.yaw;
  const deltaPitch = pitch - camera.pitch;

  return Math.sqrt(deltaYaw ** 2 + deltaPitch ** 2) <= angularRadius;
}

export function randomAngularTarget(
  targetSize: TargetSize,
  range: { yawMin: number; yawMax: number; pitchMin: number; pitchMax: number }
): Pick<Target, 'yaw' | 'pitch' | 'angularRadius'> {
  return {
    yaw: range.yawMin + Math.random() * (range.yawMax - range.yawMin),
    pitch: range.pitchMin + Math.random() * (range.pitchMax - range.pitchMin),
    angularRadius: getAngularTargetRadius(targetSize),
  };
}

